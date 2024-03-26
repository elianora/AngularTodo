using AngularTodo.Server.DTOs;
using AngularTodo.Server.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AngularTodo.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class ToDosController(ToDoDbContext db) : ControllerBase
{
    [HttpGet(Name = "GetToDos")]
    public async Task<IEnumerable<ToDoDto>> GetToDos()
        => await db.ToDos.Select(todo => new ToDoDto
        {
            Id = todo.Id,
            IsCompleted = todo.IsCompleted,
            Description = todo.Description
        }).ToListAsync();

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

        db.ToDos.Add(newTodo);
        await db.SaveChangesAsync();

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

        var todo = await db.ToDos.FindAsync(dto.Id);
        if (todo is null)
        {
            return NotFound();
        }

        todo.IsCompleted = dto.IsCompleted ?? false;
        todo.Description = dto.Description;
        db.Entry(todo).State = EntityState.Modified;
        await db.SaveChangesAsync();

        return NoContent();
    }
}
