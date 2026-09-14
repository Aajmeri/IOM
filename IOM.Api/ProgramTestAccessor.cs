// Program.cs uses top-level statements, which makes the implicit `Program` class `internal`.
// WebApplicationFactory<Program> (used by IOM.Tests integration tests) needs it to be accessible
// from the test project, so this partial-class part exposes it without touching Program.cs itself
// (Program.cs is being actively edited elsewhere for DI wiring).
public partial class Program { }
