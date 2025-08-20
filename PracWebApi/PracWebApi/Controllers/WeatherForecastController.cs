using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PracWebApi.Data;


namespace PracWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ApplicationDbContext context, ILogger<WeatherForecastController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // 1. GET all forecasts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WeatherForecast>>> GetAll()
        {
            return await _context.WeatherForecasts.ToListAsync();
        }

        // 2. GET by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<WeatherForecast>> GetById(int id)
        {
            var forecast = await _context.WeatherForecasts.FindAsync(id);
            if (forecast == null) return NotFound();
            return forecast;
        }

        // 3. POST new forecast
        [HttpPost]
        public async Task<ActionResult<WeatherForecast>> Create(WeatherForecast forecast)
        {
            _context.WeatherForecasts.Add(forecast);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = forecast.Id }, forecast);
        }

        // 4. PUT update forecast
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, WeatherForecast forecast)
        {
            if (id != forecast.Id) return BadRequest();
            _context.Entry(forecast).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // 5. DELETE forecast
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var forecast = await _context.WeatherForecasts.FindAsync(id);
            if (forecast == null) return NotFound();
            _context.WeatherForecasts.Remove(forecast);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
