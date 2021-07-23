using BrandoMagic.Domain.Common;
using BrandoMagic.Domain.Entities;

namespace BrandoMagic.Domain.Events
{
    public class TodoItemCompletedEvent : DomainEvent
    {
        public TodoItemCompletedEvent(TodoItem item)
        {
            Item = item;
        }

        public TodoItem Item { get; }
    }
}
