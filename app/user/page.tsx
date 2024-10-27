export default function Page() {
    const firstName = "Azat";
    const lastName = "Antonyan";
    const age = 23;
    const occupation = "Software Engineer";

    return (
        <div className="">
            <h1 className="text-3xl font-bold mb-4">About Me</h1>

            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <div className="text-lg mb-2">
                    <strong>First Name:</strong> {firstName}
                </div>
                <div className="text-lg mb-2">
                    <strong>Last Name:</strong> {lastName}
                </div>
                <div className="text-lg mb-2">
                    <strong>Age:</strong> {age}
                </div>
                <div className="text-lg mb-2">
                    <strong>Occupation:</strong> {occupation}
                </div>
            </div>
        </div>
    );
}
