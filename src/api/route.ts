const BACKEND_URL = "http://localhost:3001";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const materia = searchParams.get("materia");
  const nombre = searchParams.get("nombre");

  let query = "";
  if (materia) {
    query = `?materia=${encodeURIComponent(materia)}`;
  } else if (nombre) {
    query = `?nombre=${encodeURIComponent(nombre)}`;
  }

  const res = await fetch(`${BACKEND_URL}/profes${query}`);
  const data = await res.json();

  return Response.json(data);
}
