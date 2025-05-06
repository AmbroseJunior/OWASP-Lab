export async function GET() {
    return Response.json(
      { error: "Access denied" }, 
      { status: 403 }
    );
  }