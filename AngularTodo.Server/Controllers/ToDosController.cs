using AngularTodo.Server.DTOs;
using AngularTodo.Server.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularTodo.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class ToDosController : ControllerBase
{
    private readonly ToDoDbContext _db;
    private readonly ILogger<ToDosController> _logger;

    public ToDosController(ToDoDbContext db, ILogger<ToDosController> logger)
    {
        _db = db;
        _logger = logger;
    }

    [HttpGet(Name = "GetToDos")]
    public IEnumerable<ToDoDto> GetToDos()
    {
        var todos = _db.ToDos.Select(todo => new ToDoDto
        {
            Id = todo.Id,
            IsCompleted = todo.IsCompleted,
            Description = todo.Description
        });

        return todos.ToList();
    }

    [HttpPost(Name = "CreateToDo")]
    public async Task<ActionResult<ToDoDto>> CreateToDo([FromBody]ToDoDto dto)
    {
        if (dto.Description is null)
        {
            return BadRequest("Description is required");
        }

        var newTodo = new ToDo
        {
            IsCompleted = dto.IsCompleted ?? false,
            Description = dto.Description
        };

        _db.ToDos.Add(newTodo);
        await _db.SaveChangesAsync();

        var result = new ToDoDto
        {
            Id = newTodo.Id,
            IsCompleted = newTodo.IsCompleted,
            Description = newTodo.Description
        };

        return Ok(result);
    }

    [HttpPut(Name = "UpdateToDo")]
    public async Task<IActionResult> UpdateToDo([FromBody]ToDoDto dto)
    {
        if (dto.Id is null)
        {
            return BadRequest("Id is required");
        }

        if (dto.Description is null)
        {
            return BadRequest("Description is required");
        }

        var todo = await _db.ToDos.FindAsync(dto.Id);
        if (todo is null)
        {
            return NotFound();
        }

        todo.IsCompleted = dto.IsCompleted ?? false;
        todo.Description = dto.Description;
        _db.Entry(todo).State = EntityState.Modified;
        await _db.SaveChangesAsync();

        return NoContent();
    }
}
