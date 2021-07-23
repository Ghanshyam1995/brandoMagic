using BrandoMagic.Domain.Common;
using BrandoMagic.Domain.Entities;

namespace BrandoMagic.Domain.Events
{
    public class TodoItemCreatedEvent : DomainEvent
    {
        public TodoItemCreatedEvent(TodoItem item)
        {
            Item = item;
        }

        public TodoItem Item { get; }
    }
}
