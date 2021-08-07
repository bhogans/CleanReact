using System;
using System.Collections.Generic;
using System.Linq;
using KCICApprovalQueue.Models;

namespace KCICApprovalQueue.Data
{
    /// <summary>
    /// Faux database
    /// </summary>
    public static class ClaimsRepository
    {
        /// <summary>
        /// 
        /// </summary>
        private static List<ClaimDataModel> _claims = new List<ClaimDataModel>()
        {
            new ClaimDataModel()
            {
                Product = "OLED TV",
                DateSubmitted = new DateTime(2017, 03, 14),
                Issue = "Dead Pixels",
                FirstName = "John",
                LastName = "Smith",
                PaymentAmount = 300,
                IsDocumented = true,
                Status = ClaimStatus.Pending
            },
            new ClaimDataModel()
            {
                Product = "OLED TV",
                DateSubmitted = new DateTime(2019, 02, 02),
                Issue = "DOA",
                FirstName = "Jimmy",
                LastName = "John",
                PaymentAmount = 0,
                IsDocumented = false,
                Status = ClaimStatus.Approved
            },
            new ClaimDataModel(){
                Product = "4k Monitor",
                DateSubmitted = new DateTime(2019, 01, 03),
                Issue = "Controller Board Failure",
                FirstName = "Dan",
                LastName = "Marino",
                PaymentAmount = 100,
                IsDocumented = true,
                Status = ClaimStatus.Rejected
            },
            new ClaimDataModel(){
                Product = "Asus Monitor",
                DateSubmitted = new DateTime(2021, 01, 03),
                Issue = "Inverter Board Failure",
                FirstName = "Mike",
                LastName = "Malone",
                PaymentAmount = 125,
                IsDocumented = true,
                Status = ClaimStatus.Pending
            },
            new ClaimDataModel(){
                Product = "DVR",
                DateSubmitted = new DateTime(2020, 08, 03),
                Issue = "Power Supply Whinning",
                FirstName = "Larry",
                LastName = "Jones",
                PaymentAmount = 70,
                IsDocumented = true,
                Status = ClaimStatus.Approved
            },
            new ClaimDataModel(){
                Product = "Sony TV",
                DateSubmitted = new DateTime(2018, 11, 04),
                Issue = "Broken Pixels",
                FirstName = "Micheal",
                LastName = "Roots",
                PaymentAmount = 300,
                IsDocumented = true,
                Status = ClaimStatus.Pending
            }
        };

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public static ClaimDataModel Get(Guid id)
        {
            return _claims.FirstOrDefault(x => x.ID == id);
        }

        public static List<ClaimDataModel> Get(Func<ClaimDataModel, bool> filter)
        {
            return _claims.Where(filter).ToList();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public static List<ClaimDataModel> GetAll()
        {

            return _claims.OrderBy(s => s.Status).ThenBy(n => n.LastName).ToList();
        }

        public static void Insert(ClaimDataModel claim)
        {
            _claims.Add(claim);
        }

        public static void Delete(Guid id)
        {
            var claimToRemove = _claims.FirstOrDefault(x => x.ID == id);
            _claims.Remove(claimToRemove);
        }

        /// <summary>
        /// Updates claim data
        /// </summary>
        /// <param name="claim"></param>
        public static void Update(ClaimDataModel claim)
        {
            var existingClaim = _claims.Where(x => x.ID == claim.ID).FirstOrDefault<ClaimDataModel>(); ;

            if (existingClaim != null)
            {
                existingClaim.FirstName = claim.FirstName;
                existingClaim.LastName = claim.LastName;
                existingClaim.Issue = claim.Issue;
                existingClaim.PaymentAmount = claim.PaymentAmount;
                existingClaim.IsDocumented = claim.IsDocumented;
                existingClaim.Product = claim.Product;
                existingClaim.Status = claim.Status;
            }
        }

        /// <summary>
        /// Set claim status
        /// </summary>
        /// <param name="id"></param>
        /// <param name="cs"></param>
        public static void SetStatus(Guid id, string cs)
        {
            var claimToApprove = _claims.FirstOrDefault(x => x.ID == id);
            ClaimStatus claimStatus = ClaimStatus.Pending;
            switch (cs)
            {
                case "Approved":
                    claimStatus = ClaimStatus.Approved;
                    break;
                case "Rejected":
                    claimStatus = ClaimStatus.Rejected;
                    break;
                default:
                    claimStatus = ClaimStatus.Pending;
                    break;
            }
            claimToApprove.Status = claimStatus;
        }
    }
}
