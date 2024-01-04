var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "Display",
    pattern: "{controller}/{action=Display}");

app.MapControllerRoute(
    name: "displayById",
    pattern: "{controller}/{action=DisplayById}/{id?}");

// Uncomment the following block for a sample API endpoint
// app.MapGet("/api/Employee", () =>
// {
//     List<Employee> emps = EmployeeManager.GetAllEmployees();
//     return emps.ToArray();
// });

app.Run();
