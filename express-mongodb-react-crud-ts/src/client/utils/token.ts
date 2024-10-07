export const getTokenFromMeta = () => {
    const meta = document.querySelector('meta[name="token"]');
    if (meta) {
        return (meta as HTMLMetaElement).content;
    }

    return "meta is not found"
}