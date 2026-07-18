# SyncIT client support shortcuts

Desktop shortcuts that open the client's email app with a **pre-filled support ticket**
addressed to `support@syncitmsp.com`. Emails land as tickets in NinjaOne.

| File | Platform |
|------|----------|
| `SyncIT Support.url` | Windows (double-click to place on desktop) |
| `SyncIT Support.webloc` | macOS |

## What the client sees when they open it

```
To: support@syncitmsp.com
Subject: SyncIT Support Request

Company Name:
Your Name:
Phone:
Urgency (Low / Medium / High):

What is the problem?

When did it start?

Any error messages?

Device (computer name or #):
```

## Deploy to a Windows fleet via NinjaOne

1. NinjaOne → **Automation** → add a script (PowerShell) or use a file-copy policy.
2. Copy `SyncIT Support.url` to each machine's public desktop:
   - Path: `C:\Users\Public\Desktop\SyncIT Support.url`
3. Apply the policy to the client's device group. It appears on every user's desktop.

Example PowerShell (host the .url somewhere reachable, or embed the URL):

```powershell
$dest = "C:\Users\Public\Desktop\SyncIT Support.url"
@"
[InternetShortcut]
URL=mailto:support@syncitmsp.com?subject=SyncIT%20Support%20Request&body=Company%20Name%3A%20%0D%0AYour%20Name%3A%20%0D%0APhone%3A%20%0D%0AUrgency%20%28Low%20%2F%20Medium%20%2F%20High%29%3A%20%0D%0A%0D%0AWhat%20is%20the%20problem%3F%0D%0A%0D%0AWhen%20did%20it%20start%3F%0D%0A%0D%0AAny%20error%20messages%3F%0D%0A%0D%0ADevice%20%28computer%20name%20or%20%23%29%3A%20
IconIndex=0
"@ | Set-Content -Path $dest -Encoding ASCII
```

## Deploy on Mac

Hand `SyncIT Support.webloc` to the user (email/AirDrop) — they drag it to their desktop.
Or push via your Mac MDM to `/Users/Shared/`.

## Notes

- Best line-break rendering in **Outlook** and **Apple Mail**. Gmail-in-browser may flatten
  the blank lines (still works) — point heavy Gmail clients to the NinjaOne portal instead.
- Update the address here if you ever change the ticketing inbox from `support@syncitmsp.com`.
