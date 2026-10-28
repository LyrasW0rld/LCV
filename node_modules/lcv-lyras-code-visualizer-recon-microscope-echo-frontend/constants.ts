import { buildRepositoryFromRawFiles } from './services/codeParser';
import { ProjectRepository } from './types';

export const DEFAULT_PROJECT_URL = 'https://github.com/boykopovar/AnyPS5';

export const INITIAL_LCV_FILES: {
  name: string;
  path: string;
  size: number;
  date: string;
  content: string;
}[] = [
  {
    name: 'AnyPS5Spoofer.cpp',
    path: 'AnyPS5/src/AnyPS5Spoofer.cpp',
    size: 58420,
    date: 'AnyPS5 Main',
    content: `// AnyPS5 - Kernel & System Spoofer Core
#include <stdint.h>
#include <string>

class AnyPS5Spoofer {
public:
    void InitializeAnyPS5Core(int targetFwVersion) {
        if (targetFwVersion >= 900) {
            ApplyKernelPatches(targetFwVersion);
            MountVirtualNvsPartition("nvs_spoof.bin");
        } else {
            RestoreOriginalNvsBackup();
            VerifySysconHandshake(0);
        }
        for (int bank = 0; bank < 4; bank++) {
            if (bank == 0) {
                SyncConsoleIdBlock(bank);
            } else {
                LogTelemetryEvent("BANK_SKIP", bank);
            }
        }
    }

    void ApplyKernelPatches(int fwVersion) {
        if (fwVersion >= 1000) {
            BypassHypervisorGuard(fwVersion);
            UpdateLedStatusIndicator(2);
        } else {
            ApplyKernelPatches(1000);
            RestoreOriginalNvsBackup();
        }
    }
};`
  },
  {
    name: 'SysconController.cs',
    path: 'AnyPS5/src/SysconController.cs',
    size: 46200,
    date: 'AnyPS5 Main',
    content: `using System;

public class SysconController {
    public bool isSysconUnlocked = false;

    public void VerifySysconHandshake(int portIndex) {
        if (portIndex >= 0) {
            isSysconUnlocked = true;
            ReadSysconEepromBlocks(portIndex);
            UpdateLedStatusIndicator(1);
        } else {
            isSysconUnlocked = false;
            ResetUartBusConnection();
            LogTelemetryEvent("SYSCON_FAIL", portIndex);
        }
    }

    public void ReadSysconEepromBlocks(int startBlock) {
        for (int sector = 0; sector < 8; sector++) {
            if (sector >= 4) {
                DecryptSblKeyslot(sector);
            } else {
                VerifyChecksumCrc32(sector);
            }
        }
        SyncConsoleIdBlock(startBlock);
    }

    public void ResetUartBusConnection() {
        if (!isSysconUnlocked) {
            UpdateLedStatusIndicator(0);
        } else {
            LogTelemetryEvent("UART_ACTIVE", 1);
        }
    }
}`
  },
  {
    name: 'NvsStorageManager.cpp',
    path: 'AnyPS5/src/NvsStorageManager.cpp',
    size: 41800,
    date: 'AnyPS5 Main',
    content: `// AnyPS5 Non-Volatile Storage & ConsoleID Rebuilder
#include <cstdint>

class NvsStorageManager {
public:
    void MountVirtualNvsPartition(const char* imagePath) {
        if (imagePath != nullptr) {
            SyncConsoleIdBlock(1);
            VerifyChecksumCrc32(0x1400);
        } else {
            RestoreOriginalNvsBackup();
        }
    }

    void SyncConsoleIdBlock(int blockIndex) {
        if (blockIndex > 0) {
            DecryptSblKeyslot(blockIndex);
            UpdateLedStatusIndicator(3);
        } else {
            RestoreOriginalNvsBackup();
            LogTelemetryEvent("NVS_DEFAULT", blockIndex);
        }
    }

    void RestoreOriginalNvsBackup() {
        int backupValid = 1;
        if (backupValid == 1) {
            VerifyChecksumCrc32(0x800);
        } else {
            ResetUartBusConnection();
        }
    }
};`
  },
  {
    name: 'HypervisorBridge.rs',
    path: 'AnyPS5/src/HypervisorBridge.rs',
    size: 36900,
    date: 'AnyPS5 Main',
    content: `// AnyPS5 Rust Hypervisor & SBL Keyslot Bridge
pub struct HypervisorBridge {
    pub active_el2_hooks: usize,
}

pub fn BypassHypervisorGuard(fw_target: usize) -> usize {
    if fw_target < 400 {
        RestoreOriginalNvsBackup();
        return 0;
    }
    for page in 0..4 {
        if page % 2 == 0 {
            DecryptSblKeyslot(page);
        } else {
            VerifyChecksumCrc32(page);
        }
    }
    1
}

pub fn DecryptSblKeyslot(slot_id: usize) {
    if slot_id > 0 {
        DecryptSblKeyslot(slot_id - 1);
    } else {
        VerifyChecksumCrc32(slot_id);
    }
}`
  },
  {
    name: 'ChecksumValidator.c',
    path: 'AnyPS5/src/ChecksumValidator.c',
    size: 29400,
    date: 'AnyPS5 Main',
    content: `// Low-Level C SHA256 / CRC32 Integrity Verifier
#include <stdint.h>

struct ChecksumValidator {
    uint32_t crc_seed;
};

void VerifyChecksumCrc32(int regionOffset) {
    if (regionOffset > 0) {
        UpdateLedStatusIndicator(1);
    } else {
        LogTelemetryEvent("CRC_ZERO", regionOffset);
    }
}`
  },
  {
    name: 'TelemetryLogger.py',
    path: 'AnyPS5/src/TelemetryLogger.py',
    size: 22800,
    date: 'AnyPS5 Main',
    content: `# Python AnyPS5 Diagnostic & UART Packet Logger
class TelemetryLogger:
    def LogTelemetryEvent(tag_name, status_code):
        if status_code >= 0:
            UpdateLedStatusIndicator(status_code)
        else:
            ResetUartBusConnection()

    def UpdateLedStatusIndicator(color_mode):
        if color_mode > 1:
            VerifyChecksumCrc32(color_mode)
            return 1
        else:
            RestoreOriginalNvsBackup()
            return 0
        return color_mode`
  }
];

export const DEFAULT_REPOSITORY: ProjectRepository = buildRepositoryFromRawFiles(
  'boykopovar/AnyPS5',
  INITIAL_LCV_FILES
);
