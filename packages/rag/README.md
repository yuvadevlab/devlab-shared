# 🔍 @yuva-devlab/rag

[![npm version](https://img.shields.io/npm/v/@yuva-devlab/rag.svg)](https://www.npmjs.com/package/@yuva-devlab/rag)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript 6](https://img.shields.io/badge/TypeScript-6.x-3178c6.svg)](https://www.typescriptlang.org)

> High-performance Retrieval Augmented Generation (RAG) engine, semantic document chunking, vector embeddings, similarity search, and hybrid context synthesis for the DevLab platform.

---

## Features

- ✂️ **Configurable Document Chunking (`TextChunker`)**: Recursive splitting with overlap, sentence boundaries, markdown awareness, and token estimation.
- 📐 **Vector Similarity Primitives**: Optimized implementations of cosine similarity, dot product, and Euclidean distance.
- 💾 **Pluggable Vector Store (`InMemoryVectorStore`)**: Fast in-memory vector index with metadata filtering, score thresholds, and top-k retrieval.
- 🧬 **Embeddings Provider Abstraction**: Unified embeddings pipeline for OpenAI, Gemini, Hugging Face, or local embedding models.
- 🎯 **Hybrid Retrieval**: Combine dense semantic vector search with keyword filtering for high-precision context assembly.
- 📦 **Dual ESM & CJS Build**: Lightweight and portable across Node.js microservices, edge workers, and autonomous agents.

---

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Document Chunking](#document-chunking)
4. [Vector Similarity & Search](#vector-similarity--search)
5. [In-Memory Vector Store](#in-memory-vector-store)
6. [Context Retrieval for LLMs](#context-retrieval-for-llms)
7. [Author & Attribution](#author--attribution)

---

## Installation

```bash
# pnpm (recommended)
pnpm add @yuva-devlab/rag

# npm
npm install @yuva-devlab/rag
```

---

## Quick Start

### Indexing and Querying Documents

```typescript
import {
  TextChunker,
  InMemoryVectorStore,
  MockEmbeddingProvider,
} from "@yuva-devlab/rag";

// 1. Initialize components
const chunker = new TextChunker({ chunkSize: 500, chunkOverlap: 50 });
const embeddings = new MockEmbeddingProvider(1536);
const store = new InMemoryVectorStore(embeddings);

// 2. Ingest document
const document = `
DevLab Control Plane provides enterprise multi-tenancy, RS256 token signing,
and centralized process supervision. The process supervisor manages microservice
lifecycles with circular ring-buffer logs and real-time Socket.IO streams.
`;

const chunks = chunker.chunkText(document, { sourceId: "doc-portal-arch" });
await store.addChunks(chunks);

// 3. Search relevant context
const searchResults = await store.search("How does process supervision work?", {
  topK: 3,
  minScore: 0.7,
});

for (const result of searchResults) {
  console.log(
    `Score: ${result.score.toFixed(3)} | Content: ${result.chunk.content}`,
  );
}
```

---

## Document Chunking

The `TextChunker` breaks large documents into clean, semantically coherent passages while preserving sentence boundaries and context overlap:

```typescript
import { TextChunker } from "@yuva-devlab/rag";

const chunker = new TextChunker({
  chunkSize: 1000,
  chunkOverlap: 150,
  preserveParagraphs: true,
});

const chunks = chunker.chunkDocument({
  id: "sec-filing-10k",
  content: rawText,
  metadata: { ticker: "NVDA", year: 2026 },
});
```

---

## Vector Similarity & Search

Raw mathematical similarity operations optimized for high throughput:

```typescript
import { cosineSimilarity } from "@yuva-devlab/rag";

const vecA = [0.12, 0.45, 0.88, 0.23];
const vecB = [0.15, 0.42, 0.91, 0.2];

const score = cosineSimilarity(vecA, vecB);
console.log(`Cosine Similarity: ${score}`); // ~0.998
```

---

## In-Memory Vector Store

Ideal for session-level agent scratchpads, local testing, and low-latency agent memory:

```typescript
import { InMemoryVectorStore } from "@yuva-devlab/rag";

const store = new InMemoryVectorStore(embeddingProvider);

await store.upsert({
  id: "chunk-101",
  content: "User preferred risk tolerance is conservative with 15% stop-loss.",
  metadata: { userId: "usr_4401", category: "preferences" },
});

const matches = await store.search("What is the client's risk limit?", {
  filter: (meta) => meta.userId === "usr_4401",
  topK: 1,
});
```

---

## Author & Attribution

- **Author**: Yuva DevLab (`yuva.devlab@gmail.com`)
- **License**: MIT
