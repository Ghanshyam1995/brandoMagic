using BrandoMagic.Domain.Common;
using System.Threading.Tasks;

namespace BrandoMagic.Application.Common.Interfaces
{
    public interface IDomainEventService
    {
        Task Publish(DomainEvent domainEvent);
    }
}
