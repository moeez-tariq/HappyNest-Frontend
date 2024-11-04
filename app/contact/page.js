export default function Contact() {
    const team = [
      {
        name: "Alex",
        role: "Developer",
        email: "alexander.talamonti@stern.nyu.edu",
      },
      {
        name: "Basil",
        role: "Developer",
        email: "bq2024@nyu.edu",
      },
      {
        name: "Hariharan",
        role: "Developer",
        email: "hj2342@nyu.edu",
      },
      {
        name: "Moeez",
        role: "Developer",
        email: "mt4610@nyu.edu",
      },
    ];
  
    return (
      <main className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map((person, index) => (
            <div key={index} className="border p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">{person.name}</h2>
              <p className="text-gray-700 mb-2">{person.role}</p>
              <p className="text-blue-600 hover:text-blue-800">
                <a href={`mailto:${person.email}`}>{person.email}</a>
              </p>
              <p>{person.phone}</p>
            </div>
          ))}
        </div>
      </main>
    );
  }