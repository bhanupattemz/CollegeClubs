import { useNavigate } from "react-router-dom";
import Banner from "../Clubs/Banner";
import "./PastMembers.css";
import { useSelector, useDispatch } from "react-redux";
import { getPastMembers } from "../../Actions/pastUsersAction";
import { useEffect, useState } from "react";
import Loading from "../Loaders/Loading";
import { Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ConvertTime } from "../Functionalities/functionalites";

export default function PastMembers() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pastMembers, loading } = useSelector((state) => state.pastMembers);
    const [current, setCurrent] = useState("faculty")
    const currentbtnOptions = { backgroundColor: "#0A5EB0", border: "none", color: "white" }
    useEffect(() => {
        dispatch(getPastMembers());
    }, [dispatch]);
    const adminColumns = [
        { field: "id", headerName: "Sl. No" },
        { field: "name", headerName: "Name", flex: 0.3 },
        { field: "department", headerName: "Department", flex: 0.2 },
        { field: "from", headerName: "From", flex: 0.2 },
        { field: "to", headerName: "To", flex: 0.2 },
        { field: "mobileNo", headerName: "Mobile Number", flex: 0.2 },
        { field: "mail", headerName: "Mail", flex: 0.4 },
    ]

    const coordinatorColumns = [
        { field: "id", headerName: "Sl. No", flex: 0.1 },
        { field: "admissionNo", headerName: "Admission number", flex: 0.2 },
        { field: "name", headerName: "Name", flex: 0.3 },
        { field: "department", headerName: "Department", flex: 0.16 },
        {
            field: 'managedClub',
            headerName: 'managed Clubs',
            flex: 0.6,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <Box
                            display="flex"
                            flexDirection="column"
                            padding={1}
                        >
                            {params.value.map((club, index) => (
                                <Box
                                    key={index}
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    padding={1}
                                    bgcolor={index % 2 === 0 ? "#dedede" : "#f0f0f0"}
                                    borderRadius="4px"
                                >
                                    <Typography variant="body2" color="text.secondary">
                                        {club.name}:
                                    </Typography>
                                    <Typography variant="body2" fontWeight="bold" color="primary">
                                        {ConvertTime(club.duration.joined).split(",")[0]}
                                    </Typography>
                                    <Typography variant="body2" fontWeight="medium" marginX={1}>
                                        to
                                    </Typography>
                                    <Typography variant="body2" fontWeight="bold" color="primary">
                                        {ConvertTime(club.duration.left).split(",")[0]}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    )
                }

            },
        },
        { field: "mobileNo", headerName: "Mobile Number", flex: 0.2 },
        { field: "mail", headerName: "Mail", flex: 0.4 },
    ]
    const studentMembers = pastMembers?.filter(member => member.workedAs === "studentCoordinator") || [];
    const facultyMembers = pastMembers?.filter(member => member.workedAs === "facultyCoordinator") || [];
    const coordinators = pastMembers?.filter(member => member.workedAs === "coordinator") || [];
    if (loading) return <Loading />;

    return (
        <main className="past-members-main">
            <Banner
                discription={
                    "Explore a variety of student clubs that inspire creativity, leadership, and teamwork. Join like-minded peers and make the most of your campus life!"
                }
                heading={"Our Past Members"}
                link={
                    "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822528/samples/cup-on-a-table.jpg"
                }
            />
            <section className="aboutus-past-team">
                <div>
                    <h2>Past Administration Team</h2>
                    <div className="past-adminstration-team-btn past-administation-go-back-btn">
                        <button onClick={() => navigate("/about")}>Go Back</button>
                    </div>
                </div>
            </section>
            <section className="past-member-btns">
                <button onClick={() => setCurrent("faculty")} style={current == "faculty" ? currentbtnOptions : null}>Past Faculty Coordinators</button>
                <button onClick={() => setCurrent("student")} style={current == "student" ? currentbtnOptions : null}>Past Student Coordinators</button>
                <button onClick={() => setCurrent("coordinator")} style={current == "coordinator" ? currentbtnOptions : null}>Club Coordinators</button>
            </section>
            <section>
                {["student", "faculty"].includes(current) &&
                    <Box sx={{ width: "100%" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <DataGrid
                                columns={adminColumns}
                                rows={current == "student" ? studentMembers.map((item, inx) => ({
                                    ...item,
                                    from: ConvertTime(item.duration.joined).split(",")[0],
                                    to: ConvertTime(item.duration.left).split(",")[0],
                                    id: inx + 1
                                })) :
                                    facultyMembers.map((item, inx) => ({
                                        ...item,
                                        from: ConvertTime(item.duration.joined).split(",")[0],
                                        to: ConvertTime(item.duration.left).split(",")[0],
                                        id: inx + 1
                                    }))

                                }
                                pageSize={5}
                                rowsPerPageOptions={[5, 10, 20]}
                                sx={{ '& .MuiDataGrid-root': { fontSize: '16px' } }}
                                loading={loading}
                                style={{ minHeight: "50vh", backgroundColor: "#ecf1f5" }}
                            />
                        </div>
                    </Box>
                }
                {current == "coordinator" &&
                    <Box sx={{ width: "100%" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <DataGrid
                                columns={coordinatorColumns}
                                rows={coordinators.map((item, inx) => {
                                    return {
                                        ...item,
                                        id: inx + 1,
                                    }
                                })}
                                pageSize={5}
                                rowsPerPageOptions={[5, 10, 20]}
                                sx={{ '& .MuiDataGrid-root': { fontSize: '16px' } }}
                                loading={loading}
                                getRowHeight={() => 'auto'}
                                style={{ minHeight: "50vh", backgroundColor: "#ecf1f5" }}

                            />
                        </div>
                    </Box>
                }

            </section>
        </main>
    );
}
