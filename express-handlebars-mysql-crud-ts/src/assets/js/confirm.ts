
export const confirm = () => {

    const cancelButton = document.querySelector('.confirm .btn-secondary');
    const okButton = document.querySelector('.confirm .btn-primary');

    return new Promise((resolve, rejext) => {

        if (cancelButton) {
            cancelButton.addEventListener('click', async (event: Event) => {
                return resolve(false);
            });
        }

        if (okButton) {
            okButton.addEventListener('click', async (event: Event) => {
                return resolve(true);
            });
        }

    })
}
