# PetVision Marketing Assets - Quick Start Guide


## ✅ What Was Created

### 1. Image Generation Skill
`skills/image-generation.md` - Complete skill for generating PetVision marketing assets


### 2. Comprehensive Prompt Library
`assets/marketing/prompts/` - Three files with detailed prompts:

| File | Purpose | Count |
|------|----------|--------|
| `app-screenshots.txt` | App UI mockups | 6 screens |
| `marketing-banners.txt` | Website banners | 8 banners |
| `social-media.txt` | Social media content | 10+ prompts |

### 3. Marketing Guide
`assets/marketing/MARKETING_GUIDE.md` - Complete marketing playbook:
- Brand guidelines (colors, typography, voice)
- Social media templates with actual copy
- Content calendar (3 weeks)
- Quality checklist
- Tracking metrics guide

---

## 🚀 Quick Start: Generate Your First Asset

### Option 1: Use ChatGPT + DALL-E
```bash
# 1. Copy a prompt from prompts/
cat assets/marketing/prompts/app-screenshots.txt | head -20

# 2. Paste into ChatGPT with:
"Generate an image: [paste prompt here]"

# 3. DALL-E will create the image
```

### Option 2: Use Midjourney (Best Quality)
```bash
# 1. Join Midjourney Discord
# https://discord.gg/midjourney

# 2. Use /imagine command
/imagine [paste prompt from prompts/ here]

# 3. Save best result
```

### Option 3: Use Stable Diffusion (Free)
```bash
# 1. Go to https://stablediffusionweb.com
# 2. Paste prompt
# 3. Adjust settings: Aspect ratio, steps, guidance
# 4. Generate multiple versions
```

### Option 4: Use Leonardo.AI (Social Media Optimized)
```bash
# 1. Go to https://leonardo.ai
# 2. Select "Twitter" or "Instagram" preset
# 3. Paste prompt
# 4. Generate (fast and affordable)
```

---

## 📱 Recommended First Assets to Generate

### Priority 1: Landing Page Hero
```
File: assets/marketing/prompts/marketing-banners.txt
Prompt #1: "Main Landing Page Hero"

Description: Professional lifestyle shot of happy pet owner with golden retriever
Why: Most important visual for conversion
Where: index.html hero, Vercel landing page
```

### Priority 2: App Store Screenshots
```
File: assets/marketing/prompts/app-screenshots.txt
Prompts #1-6: All app screens

Description: Complete app UI showcase
Why: Required for app stores
Where: App Store, Google Play, website showcase
```

### Priority 3: Social Media Launch Content
```
File: assets/marketing/prompts/social-media.txt
- Instagram Hero Post (Prompt #1)
- Twitter Problem Agitation (Prompt #1)
- LinkedIn Value Proposition (Prompt #1)

Why: Build initial social media presence
Where: Instagram, Twitter, LinkedIn
```

---

## 🎨 Brand Color Codes
Copy these exact hex codes for consistent branding:

| Usage | Color | Hex Code |
|--------|--------|----------|
| Primary Green | 🟢 | `#0df2a6` |
| Primary Dark | 🟢 | `#16b78f` |
| Dark Background | ⬛ | `#10221c` |
| Light Background | ⬜ | `#f5f8f7` |
| Dark Text | ⬛ | `#0d1c17` |
| Light Text | ⬜ | `#e8f5f1` |

---

## 📝 Next Steps

1. **Choose image generator** based on your needs:
   - Quality focus: Midjourney
   - Product shots: DALL-E 3
   - Free: Stable Diffusion
   - Social media: Leonardo.AI

2. **Generate 3-5 images** to start:
   - 1 landing page hero
   - 3 app screenshots
   - 1 social media post
3. **Review and iterate**:
   - Check if brand colors are correct
   - Ensure app UI is accurate
   - Test on target platform (web, mobile)
4. **Update marketing materials**:
   - Replace placeholder images in index.html
   - Add to app store listings
   - Post on social media

---

## 📞 Need Help?

- **Prompt quality issues**: Try adjusting style keywords in prompts
- **Brand consistency**: Use hex codes above for exact colors
- **App UI accuracy**: Reference actual app screenshots in app/ folder
- **Social media best practices**: Check MARKETING_GUIDE.md for templates

---

## 📊 Example Output Structure

After generating images, organize them as:
```
assets/marketing/images/
├── landing/
│   ├── hero-banner.jpg
│   └── feature-1.jpg
├── app-screenshots/
│   ├── home-dashboard.jpg
│   ├── symptom-tracker.jpg
│   ├── ai-analysis.jpg
│   ├── pet-profile.jpg
│   ├── resources.jpg
│   └── profile.jpg
└── social/
    ├── instagram-hero.jpg
    ├── twitter-problem.jpg
    ├── linkedin-value.jpg
    └── tiktok-hook.jpg
```

---

**Ready to generate your first PetVision marketing asset!** 🚀
