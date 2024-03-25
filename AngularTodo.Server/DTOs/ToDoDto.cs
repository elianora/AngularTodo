namespace AngularTodo.Server.DTOs;

public class ToDoDto
{
    public uint? Id { get; set; }
    public bool? IsCompleted { get; set; }
    public string? Description { get; set; }
}
