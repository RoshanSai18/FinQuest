# Video Storage Guide

Place your learning module videos in the following structure:

```
videos/
  learning/
    level-1/
      module-1-chapter-1.mp4  (What Money Really Is)
      module-1-chapter-2.mp4  (Income vs Wealth)
      module-2-chapter-1.mp4  (Money Leaks)
      module-2-chapter-2.mp4  (Needs vs Wants)
      module-2-chapter-3.mp4  (Budgeting)
      module-3-chapter-1.mp4  (Emergency Fund)
      module-3-chapter-2.mp4  (Banking Basics)
    level-2/
      module-1-chapter-1.mp4
      ...
    level-3/
      module-1-chapter-1.mp4
      ...
    level-4/
      module-1-chapter-1.mp4
      ...
```

## Current Implementation - Level 1

### Module 1: Money Mindset Reset
- `module-1-chapter-1.mp4` - What Money Really Is (8:30)
- `module-1-chapter-2.mp4` - Income vs Wealth - The Reality Check (10:15)

### Module 2: Spending & Budget Control
- `module-2-chapter-1.mp4` - Where Money Secretly Leaks (12:20)
- `module-2-chapter-2.mp4` - Needs vs Wants vs Comforts (9:45)
- `module-2-chapter-3.mp4` - Budgeting Without Spreadsheets (11:00)

### Module 3: Emergency Fund & Banking
- `module-3-chapter-1.mp4` - Your Financial Shield - Emergency Fund (10:30)
- `module-3-chapter-2.mp4` - Banking & Digital Money Basics (13:15)

## Features

- **Quiz Unlocking**: Quizzes are locked until all videos in a module are watched (90% completion threshold)
- **Progress Tracking**: Video completion is tracked automatically
- **Border Colors**: Interface uses level-specific colors (Level 1 = Green #10b981)

## Supported Format

- **Format**: MP4 (H.264 codec recommended)
- **Resolution**: 720p or 1080p
- **Aspect Ratio**: 16:9

## Note

Files in the `public/` folder are directly accessible via URL without import statements.
If you have the same video for multiple chapters during development, you can duplicate or create symbolic links.
