using HealthHub.Domain.Common;

namespace HealthHub.Application.Persistence;
public interface IAsyncRepository<T> where T : class
{
    Task<Result<T>> UpdateAsync(T entity);
    Task<Result<T>> FindByIdAsync(Guid id);
    Task<Result<T>> AddAsync(T entity);
    Task<Result<T>> DeleteAsync(Guid id);
    Task<Result<IReadOnlyList<T>>> GetPagedResponseAsync(int page, int size);
    Task<Result<IReadOnlyList<T>>> GetAllAsync();
}
