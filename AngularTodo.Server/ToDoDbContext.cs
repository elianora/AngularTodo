using AngularTodo.Server.Entities;
using Microsoft.EntityFrameworkCore;

namespace AngularTodo.Server;

public class ToDoDbContext : DbContext
{
    public DbSet<ToDo> ToDos { get; set; }

    public ToDoDbContext(DbContextOptions<ToDoDbContext> options)
        : base(options)
    { }
}
