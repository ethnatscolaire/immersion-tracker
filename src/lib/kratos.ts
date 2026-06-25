import {
  Configuration,
  FrontendApi,
  LoginFlow,
  RecoveryFlow,
  RegistrationFlow,
  UiText,
} from "@ory/kratos-client";

export const kratosFrontendApi = new FrontendApi(
  new Configuration({
    // Tell axios to send cookies
    baseOptions: {
      withCredentials: true,
    },
    basePath: process.env.NEXT_PUBLIC_KRATOS_PUBLIC_URL,
  }),
);

type KratosFlow = RegistrationFlow | LoginFlow | RecoveryFlow;

// Type guard for kratos flows
export function isFlow<T extends KratosFlow>(flow: unknown): flow is T {
  return (
    !!flow &&
    typeof flow === "object" &&
    "ui" in flow &&
    !!flow.ui &&
    typeof flow.ui === "object"
  );
}

export function extractMessages(flow?: KratosFlow): {
  global: Array<UiText>;
  nodes: Record<string, { hasError: boolean; messages: Array<UiText> }>;
} {
  if (!flow) {
    return { global: [], nodes: {} };
  }

  const globalMessages = flow.ui.messages ?? [];

  const nodeMessages = flow.ui.nodes.reduce(
    (acc, node) => {
      if ("name" in node.attributes && node.messages.length > 0) {
        acc[node.attributes.name] = {
          hasError: node.messages.some((msg) => msg.type === "error"),
          messages: node.messages,
        };
      }

      return acc;
    },
    {} as Record<string, { hasError: boolean; messages: Array<UiText> }>,
  );

  return {
    global: globalMessages,
    nodes: nodeMessages,
  };
}
