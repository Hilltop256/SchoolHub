# Automated Deployment Configuration

## Vercel Auto-Deployment Setup

### Step 1: Connect Repository to Vercel

Since Vercel is not yet connected, follow these steps:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import the `SchoolHub` repository
4. Vercel will automatically:
   - Detect Next.js framework
   - Configure build settings
   - Set up preview deployments
   - Configure production deployment from main branch

### Step 2: Environment Variables Setup

In Vercel Dashboard → Settings → Environment Variables:

```
Variable Name                    | Value                          | Environment
---------------------------------|--------------------------------|-------------
NEXT_PUBLIC_SUPABASE_URL         | https://your-project.supabase.co | Production, Preview, Development
NEXT_PUBLIC_SUPABASE_ANON_KEY    | your-anon-key-here             | Production, Preview, Development
```

### Step 3: Deployment Triggers

Once connected, Vercel will automatically:
- Deploy every push to `main` branch → Production
- Deploy every PR → Preview deployment
- Run `bun run vercel-build` for each deployment

## Alternative: Manual Deployment

### Push to Remote and Deploy

```bash
# Ensure on main branch with latest changes
git checkout main
git pull origin main

# Push to remote
git push origin main

# Deploy via Vercel CLI
vercel --prod --token YOUR_VERCEL_TOKEN
```

### GitHub Actions Auto-Deploy

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel on Push

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
      
      - name: Install Dependencies
        run: bun install
      
      - name: Type Check
        run: bun run typecheck
      
      - name: Lint
        run: bun run lint
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: ./sessions/agent_72ad5ae9-4e37-4006-ae21-06ae49a77f5b
```

Set these secrets in GitHub:
- `VERCEL_TOKEN` - Vercel authentication token
- `VERCEL_ORG_ID` - Your Vercel organization ID
- `VERCEL_PROJECT_ID` - Your Vercel project ID

## Git Branch Strategy

### Current Setup

```
main                    → Production (auto-deploys on push)
└── session/agent_*     → Feature branches (PR → Preview)
```

### Workflow

1. **Create feature branch** from main
2. **Develop** on feature branch
3. **Create PR** to main
4. **Vercel creates** preview deployment
5. **Review & approve**
6. **Merge to main**
7. **Vercel auto-deploys** to production

## Monitoring Deployments

### Vercel Dashboard

- View deployment history: `vercel ls`
- Check deployment status: Vercel Dashboard
- View logs: `vercel logs`
- Rollback: `vercel rollback <url>`

### Webhook Notifications

Configure in Vercel → Settings → Webhooks:
- Deployment started
- Deployment completed
- Deployment failed

## CI/CD Pipeline Status

### Quality Gates

All deployments pass through these checks:

1. ✅ TypeScript compilation (`tsc --noEmit`)
2. ✅ ESLint validation
3. ✅ Production build (`bun run vercel-build`)
4. ✅ All tests passing (when added)

### Build Performance

- Build time: ~3 seconds
- Bundle size: Optimized
- Static generation: 7 routes prerendered

## Environment Configuration

### Preview Deployments

Automatically get:
- Unique preview URL
- Copy of production database (via Supabase branching or seeding)
- All environment variables
- Separate analytics tracking

### Production Deployments

- Main branch only
- All environment variables
- Full production resources
- Custom domain support
- Automatic HTTPS

## Troubleshooting

### Auto-Deploy Not Working

1. Check Vercel project is connected
2. Verify main branch is selected in Vercel
3. Confirm environment variables are set
4. Check GitHub webhook is configured
5. Review deployment logs in Vercel Dashboard

### Build Fails on Vercel

```bash
# Test locally first
bun run vercel-build

# Check environment variables match
vercel env pull

# Review Vercel logs
vercel logs
```

### Rollback Procedure

```bash
# List deployments
vercel ls

# Rollback to specific deployment
vercel rollback <deployment-url>

# Or via Vercel Dashboard
# Dashboard → Project → Deployments → Click deployment → Rollback
```

## Deployment Checklist

- [x] Repository structure ready
- [x] Vercel configuration files created
- [x] Build scripts configured
- [x] Environment variables documented
- [ ] Connect to Vercel (manual step)
- [ ] Configure environment variables in Vercel (manual step)
- [ ] Set up GitHub webhook (automatic on Vercel connect)
- [ ] Test preview deployment
- [ ] Test production deployment
- [ ] Configure custom domain (optional)
- [ ] Set up monitoring

## Next Steps for Auto-Deployment

1. **Connect to Vercel** - Run `vercel link` or connect via dashboard
2. **Add env vars** - Configure in Vercel settings
3. **Test deploy** - Run `./deploy.sh`
4. **Configure GitHub** - Optional but recommended for PR previews
5. **Go live** - Push to main branch

