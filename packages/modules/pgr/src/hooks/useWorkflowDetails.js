import { useState, useEffect } from "react";

const useWorkflowDetails = ({ tenantId, id, role = "CITIZEN" }) => {
  const [workflowDetails, setWorkflowDetails] = useState({});
  useEffect(() => {
    (async () => {
      //TO do. get tenant id
      const workflow = await Digit.workflowService.getByBusinessId(tenantId, id);
      const businessServiceResponse = (await Digit.workflowService.init("pb.amritsar", "PGR")).BusinessServices[0].states;
      if (workflow && workflow.ProcessInstances) {
        // const processInstances = workflow.ProcessInstances.sort((a, b) => a.auditDetails.createdTime - b.auditDetails.createdTime);
        const processInstances = workflow.ProcessInstances;
        const nextStates = processInstances[0].nextActions.map((action) => ({ action: action.action, nextState: action.nextState }));
        const nextActions = nextStates.map((id) => ({
          action: id.action,
          state: businessServiceResponse.find((state) => state.uuid === id.nextState),
        }));
        const actionRolePair = nextActions?.map((action) => ({
          action: action.action,
          roles: action.state.actions?.map((action) => action.roles).join(","),
        }));

        console.log("workflow details 123", processInstances, nextStates, nextActions);
        if (processInstances.length > 0) {
          const details = {
            timeline: processInstances.map((instance) => ({
              status: instance.state.applicationStatus,
              caption: instance.assignes ? instance.assignes.map((assignee) => ({ name: assignee.name, mobileNumber: assignee.mobileNumber })) : null,
              auditDetails: {
                created: Digit.DateUtils.ConvertTimestampToDate(instance.auditDetails.createdTime),
                lastModified: Digit.DateUtils.ConvertTimestampToDate(instance.auditDetails.lastModifiedTime),
              },
              timeLineActions: instance.state.actions
                ? instance.state.actions.filter((action) => action.roles.includes(role)).map((action) => action.action)
                : null,
            })),
            nextActions: actionRolePair,
          };
          if (role !== "CITIZEN") {
            details.timeline.push({
              status: "COMPLAINT_FILED",
            });
          }
          console.log("wf details", details, role);
          setWorkflowDetails(details);
        }
      } else {
        console.warn("error fetching workflow services");
      }
    })();
  }, [tenantId, id]);

  return workflowDetails;
};

export default useWorkflowDetails;
