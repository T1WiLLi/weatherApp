export default function showLoading(): void {
    const loadingSection = document.querySelector('[data-loading]');
    if (loadingSection) {
        loadingSection.innerHTML = `
            <div class="alert alert-info d-flex align-items-center justify-content-between gap-2 text-start">
                <span>Loading...</span>
                <img alt="Loader" class="loader" src="/images/loader.gif">
            </div>
        `;
    }
}
