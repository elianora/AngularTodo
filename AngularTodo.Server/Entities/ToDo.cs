namespace AngularTodo.Server.Entities;

public class ToDo
{
    public uint Id { get; set; }
    public bool IsCompleted { get; set; }
    public required string Description { get; set; }
}