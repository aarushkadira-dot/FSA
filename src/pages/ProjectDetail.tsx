import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProjectDetail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/projects", { replace: true });
  }, [navigate]);

  return null;
};

export default ProjectDetail;
