import {
	APIGatewayProxyStructuredResultV2,
	APIGatewayProxyEventV2,
} from "aws-lambda";

export const handleDisconnect = async (
	event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyStructuredResultV2> => {
	return {};
};
