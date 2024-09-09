export default function showError(error: string): void {
    const errorSection = document.querySelector('[data-error]');
    if (errorSection) {
        errorSection.innerHTML = `
            <div class="alert alert-danger d-flex align-items-center justify-content-between gap-2 text-start">
                <span>${error}</span>
                <i class="fa-solid fa-triangle-exclamation fs-4"></i>
            </div>
        `;
    }
}
