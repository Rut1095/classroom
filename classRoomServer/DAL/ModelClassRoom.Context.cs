﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class DigitlClassRoomUpdateEntities : DbContext
    {
        public DigitlClassRoomUpdateEntities()
            : base("name=DigitlClassRoomUpdateEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Classes> Classes { get; set; }
        public virtual DbSet<ClassLessons> ClassLessons { get; set; }
        public virtual DbSet<lessons> lessons { get; set; }
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<UsersLessons> UsersLessons { get; set; }
        public virtual DbSet<ActiveUser> ActiveUser { get; set; }
        public virtual DbSet<Document> Document { get; set; }
    }
}
