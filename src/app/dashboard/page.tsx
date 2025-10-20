export default function Dashboard() {
    return (
        <section className="mx-auto flex max-w-4xl flex-col gap-4 rounded-3xl border border-border/60 bg-card/95 p-8 shadow-xl">
            <div>
                <h1 className="text-3xl font-semibold text-foreground">Welcome back to DreamCV</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Your recent drafts and generated resumes will appear here.
                </p>
            </div>
            <div className="rounded-2xl border border-dashed border-border/60 bg-background/60 p-6 text-sm text-muted-foreground dark:bg-background/40">
                Resume insights and progress tracking are coming soon.
            </div>
        </section>
    );
}