const RoleCategory = () => {
    const Role = ["Frontend Developer", "Data Science", "Machine Learing", "Full Stack Developer", "Mern Stack Developer"]
    return (
        <div className="bg-amber-500">
            {Role.map((role, index) => {
               return <button className="text-white">{role}</button>
            })}
        </div>
    )
}
export default RoleCategory