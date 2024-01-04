using Microsoft.AspNetCore.Mvc;
using BOL;
using DAL;
using System.ComponentModel.Design;

namespace Controller;

[ApiController]
[Route("[controller]")]
public class StudentController : ControllerBase
{
    private readonly ILogger<StudentController> _logger;
    public StudentController(ILogger<StudentController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<Student> Display()
    {
        List<Student> sts = Dbmanager.GetAll();
        return sts.ToArray();
    }

    [HttpGet("{id}")]
    public Object DisplayById(int id)
    {
        List<Student> st = Dbmanager.GetAll();
        var st1 = from Student in st
                     where Student.Id.Equals(id)
                     select new { Student.Id, Student.FirstName, Student.LastName, Student.Dob, Student.Email};
        return st1.ToArray();
    }

    // }
    // [HttpGet("{Name}")]
    // public Object GetByName(string name)
    // {
    //     Object emp = EmployeeManager.GetByNAme(name);
    //     return emp;
    // }
}

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    