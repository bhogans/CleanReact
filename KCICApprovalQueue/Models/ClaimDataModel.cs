using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace KCICApprovalQueue.Models
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum ClaimStatus
    {
        Pending = 0,
        Approved = 1,
        Rejected = 2
    }
    public class ClaimDataModel
    {
        [Key]
        public Guid ID { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }

        [Required]
        public DateTime DateSubmitted { get; set; }
        
        public string SubmittedBy { get; set; }

        [Required]
        public string Issue { get; set; }

        [Required]
        public string Product { get; set; }

        [Required]
        [ReadOnly(true)]
        public bool IsDocumented { get; set; }

        public decimal PaymentAmount { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public ClaimStatus Status { get; set; }
        public string ReviewRationale { get; set; }

        public string ReviewedBy { get; set; }
        public DateTime DateReviewed { get; set; }

        public ClaimDataModel()
        {
            ID = Guid.NewGuid();
            Status = 0;
        }
    }
}
