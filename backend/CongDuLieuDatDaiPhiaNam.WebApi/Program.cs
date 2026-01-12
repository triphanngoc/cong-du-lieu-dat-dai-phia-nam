using CongDuLieuDatDaiPhiaNam.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var httpsPort = app.Configuration["ASPNETCORE_HTTPS_PORT"];
var urls = app.Configuration["ASPNETCORE_URLS"] ?? app.Configuration["urls"];
var hasHttpsEndpoint =
    !string.IsNullOrWhiteSpace(httpsPort) ||
    (!string.IsNullOrWhiteSpace(urls) &&
     urls.IndexOf("https://", StringComparison.OrdinalIgnoreCase) >= 0);

if (hasHttpsEndpoint)
{
    app.UseHttpsRedirection();
}
app.UseCors("AllowFrontend");
app.UseAuthorization();
app.MapControllers();
app.MapGet("/api/v1/cdlddpn/health", () => Results.Ok(new { status = "ok", service = "cdlddpn" }));

app.Run();
