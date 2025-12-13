export function Footer() {
  return (
  <footer className="py-8 px-4 border-t border-border">
    <div className="container mx-auto max-w-4xl text-center">
      <p className="text-muted-foreground text-sm">
        © {new Date().getFullYear()} Josiah Lamuel Rosell. All rights reserved.
      </p>
      <p className="text-muted-foreground/60 text-xs mt-2">
        Built with ❤️
      </p>
    </div>
  </footer>
)

}
