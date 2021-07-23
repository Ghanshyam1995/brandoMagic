using BrandoMagic.Application.Common.Interfaces;
using System;

namespace BrandoMagic.Infrastructure.Services
{
    public class DateTimeService : IDateTime
    {
        public DateTime Now => DateTime.Now;
    }
}
