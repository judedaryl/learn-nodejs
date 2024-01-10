type WebhookFeed = 'miner' | 'hashsense' | 'failed-login-attempts'

// webhook_configurations
interface WebhookConfiguration {
    // primary key
    userId: string
    // sort key
    feed: WebhookFeed
    webhookId: string
    webhookUrl: string
    secret: string
    validateSsl: boolean
}

type WebhookRequestStatus = 'pending' | 'failed' | 'completed'
// webhook_requests
interface WebhookRequests {
    // primary key
    webhookId: string
    // sort key
    timestamp: number
    status: WebhookRequestStatus
    error: string
}