//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class ActiveUser
    {
        public int UserId { get; set; }
        public Nullable<int> ClassLessonId { get; set; }
        public Nullable<System.TimeSpan> ConnectTime { get; set; }
        public string sessionId { get; set; }
        public Nullable<System.DateTime> LastConnectDateTime { get; set; }
        public Nullable<bool> showCamera { get; set; }
        public Nullable<bool> showMicrophone { get; set; }
    }
}
