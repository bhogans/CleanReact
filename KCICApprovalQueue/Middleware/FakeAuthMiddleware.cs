using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace KCICApprovalQueue.Middleware
{
    public class FakeAuthMiddleware
{
    private readonly RequestDelegate _next;

    public FakeAuthMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var fakeAuthHeader = context.Request.Headers["fake-auth"];
        if (!string.IsNullOrWhiteSpace(fakeAuthHeader) && fakeAuthHeader != "Unauthenticated")
        {
            //Create an authenticated "fakeauth" ClaimsIdentity using JWT claim types
            var identity = new ClaimsIdentity(new List<Claim>()
            {
                new Claim("name", fakeAuthHeader)
            }, "fakeauth", "name", "role");

            //Everyone but "Unauthenticated" is a submitter
            identity.AddClaim(new Claim("role", "submitter"));

            //For the test approver user, add the approver role
            if (fakeAuthHeader == "ApproverUser")
            {
                identity.AddClaim(new Claim("role", "approver"));
            }

            //Wrap the ClaimsIdentity in a ClaimsPrinicpal
            var claimsPrincipal = new ClaimsPrincipal(identity);

            //set the context User
            context.User = claimsPrincipal;
        }

        // Call the next delegate/middleware in the pipeline
        await _next(context);
    }
}
}
