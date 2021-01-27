import { useQuery, useQueryClient } from "react-query";

const useFetchPayment = ({ tenantId, consumerCode, businessService }) => {
  const queryClient = useQueryClient();
  const { isLoading, error, isError, data } = useQuery(["paymentFetchDetails", tenantId, consumerCode, businessService], () =>
    Digit.PaymentService.fetchBill(tenantId, { consumerCode, businessService })
  );

  return {
    isLoading,
    error,
    isError,
    data,
    revalidate: () => queryClient.invalidateQueries(["paymentFetchDetails", tenantId, consumerCode, businessService]),
  };
};

export default useFetchPayment;