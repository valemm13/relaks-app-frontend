// app/profes/services/profesService.ts

export class ProfesService {
  private baseUrl = "http://localhost:3000/profes";

  async getAll() {
    const res = await fetch(this.baseUrl);
    return res.json();
  }

  async searchByNombre(nombre: string) {
    const res = await fetch(`${this.baseUrl}?nombre=${nombre}`);
    return res.json();
  }

  async createProfesor(data: { nombre: string; facultad: string }) {
    const res = await fetch(this.baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  }
}
