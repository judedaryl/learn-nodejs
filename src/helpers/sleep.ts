export default async function(ms: number) {
    await new Promise(res => setTimeout(res, ms))
}