# Image Generation Skill for PetVision


## Purpose
Generate marketing assets, app screenshots, and promotional images for PetVision pet health app.


## Capabilities
- Generate app screenshots/mockups
- Create marketing banners and hero images
- Design social media graphics
- Produce promotional materials
- Generate pet health related visuals


## Installation
No dependencies required - uses system tools and AI APIs.


## Usage

### Generate App Screenshot
```bash
# Generate hero image for landing page
python3 -c "
import requests
import json

# Placeholder - replace with actual API
data = {
  'prompt': 'PetVision app showing dog health dashboard with wellness score on mobile phone screen, modern UI design, clean interface',
  'size': '1024x1024'
}
print(json.dumps(data))
"
```

### Generate Marketing Banner
```bash
python3 -c "
prompt = 'PetVision - AI-powered pet health tracking app for dogs and cats. Show happy golden retriever with smartphone displaying health metrics. Professional, modern, trustworthy design.'
print(prompt)
"
```

### Generate Social Media Post
```bash
python3 -c "
prompt = 'Instagram post showing PetVision app features: symptom tracker, AI health analysis, pet profiles. Square format 1080x1080, vibrant colors #0df2a6 green theme.'
print(prompt)
"
```

## Prompt Templates

### App Screenshots
- "PetVision home screen dashboard showing pet wellness score of 92/100, golden retriever profile, activity feed, modern mobile UI design, clean interface"
- "Symptom tracker screen with categories: weight, skin, mood, stool. Dog health tracking form, intuitive interface, green accent colors"
- "AI health analysis camera screen with pet photo upload, scanning animation, health insights cards, dark mode interface"


### Marketing Visuals
- "PetVision app logo - stylized paw print with health cross, gradient from #0df2a6 to #16b78f, modern minimal design, white background"
- "Hero banner: Happy pet owner with healthy golden retriever, holding phone with PetVision app visible, lifestyle photography, warm lighting, trustworthy atmosphere"
- "Feature graphic: Three mobile phones showing PetVision features - symptom tracking, AI analysis, health library. Clean layout, #10221c dark background"


### Social Media
- "Twitter/X header image: PetVision branding with tagline 'Know Your Pet's Health Before Problems Get Serious', 1500x500 format, professional, modern"
- "Instagram story template: 'Track Your Pet's Health Today', mobile phone with app interface, cute pet, clear call-to-action, vertical format 1080x1920"
- "LinkedIn banner: PetVision for pet owners, professional pet health management, B2B focused, clean corporate design"

## Color Scheme
- Primary: #0df2a6 (teal green)
- Primary Dark: #16b78f (darker teal)
- Background: #10221c (dark green)
- Background Light: #f5f8f7 (light mint)
- Text: #0d1c17 (dark green)
- Text Light: #e8f5f1 (light mint)

## Output Format
Images saved to: `/a0/usr/projects/petvision_01/assets/marketing/`

## File Naming
- `hero-banner-{date}.jpg`
- `app-screenshot-{screen}-{date}.jpg`
- `social-{platform}-{type}-{date}.jpg`
- `logo-variant-{name}.png`
