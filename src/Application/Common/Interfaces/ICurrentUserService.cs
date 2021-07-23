namespace BrandoMagic.Application.Common.Interfaces
{
    public interface ICurrentUserService
    {
        string UserId { get; }

        string UserName { get; }
        public long _userId { get; }
    }
}
