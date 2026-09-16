# Static Document Storage (`public/documents/`)

Place all downloadable and embeddable documents here:

- **PDFs**: Whitepapers, research paper drafts, technical briefs (`.pdf`)
- **Slide Decks**: Presentations, pitch decks, architecture walkthroughs (`.pptx`, `.pdf`)
- **Assets**: High-resolution diagrams, vector exports

## How files are served in Next.js

Any file placed in `public/documents/` is automatically accessible at:
```
http://localhost:3000/documents/<filename>
```

For example:
- `public/documents/reforge-whitepaper.pdf` → `/documents/reforge-whitepaper.pdf`
- `public/documents/presentation-deck.pdf` → `/documents/presentation-deck.pdf`

## Embedding in Fumadocs MDX

### Embedded PDF Viewer
```html
<iframe 
  src="/documents/reforge-whitepaper.pdf" 
  className="w-full h-[600px] rounded-lg border my-4" 
/>
```

### Download Button / Card
```mdx
<Cards>
  <Card 
    title="Reforge Whitepaper (PDF)" 
    description="Full academic draft with formulas and benchmarks" 
    href="/documents/reforge-whitepaper.pdf" 
    external
  />
</Cards>
```
