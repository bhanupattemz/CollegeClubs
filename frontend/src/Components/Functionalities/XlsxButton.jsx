import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from "@mui/material";
import { FaDownload } from "react-icons/fa6";
const ExcelDownloadButton = ({ filename, data }) => {
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, filename);
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const dataBlob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
        saveAs(dataBlob, `${filename}.xlsx`);
    };
    return (
        <Button variant="contained" onClick={exportToExcel}>
            <span style={{marginRight:"10px"}}><FaDownload /></span> Download {filename}
        </Button>
    );
};

export default ExcelDownloadButton;
