export function clearSection(sectionSelector: string): void {
    const section = document.querySelector(sectionSelector);
    if (section) {
        section.innerHTML = '';
    }
}