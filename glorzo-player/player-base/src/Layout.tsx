import { makeStyles } from "@glorzo-player/theme";

const useStyles = makeStyles()((theme) => ({
  root: {
    height: "100vh",
    width: "100%",
    minHeight: "400px",
    minWidth: "600px",
  },
  navbar: {
    width: "216px",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    borderRight: `1px solid ${theme.palette.divider.primary}`,
  },
  main: {
    background: theme.palette.background.paper,
    position: "fixed",
    height: "100%",
    left: "216px",
    right: 0,
  },
  content: {
    paddingTop: "52px",
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.text.primary,
      borderRadius: "5px",
    },
    "&::-webkit-scrollbar-trak": {
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-corner": {
      backgroundColor: "transparent",
    },
  },
  header: {
    zIndex: 99,
    height: "52px",
    position: "fixed",
    top: 0,
    width: "100%",
    background: theme.palette.background.transparent,
    borderBottom: `0.5px solid ${theme.palette.divider.secondary}`,
    backdropFilter: "blur(10px)",
  },
}));

export default function Layout(): JSX.Element {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.navbar}></div>
      <div className={classes.main}>
        <div className={classes.header}></div>
        <div className={classes.content}>
          <div style={{ fontSize: 50 }}>
            18 CoreFoundation 0x00000001858cf878 CFRunLoopRunSpecific + 612 19 HIToolbox
            0x000000018efaffa0 RunCurrentEventLoopInMode + 292 20 HIToolbox 0x000000018efafde4
            ReceiveNextEventCommon + 672 21 HIToolbox 0x000000018efafb2c
            _BlockUntilNextEventMatchingListInModeWithFilter + 72 22 AppKit 0x0000000188b5584c
            _DPSNextEvent + 632 23 AppKit 0x0000000188b549dc -[NSApplication(NSEvent)
            _nextEventMatchingEventMask:untilDate:inMode:dequeue:] + 728 24 AppKit
            0x0000000188b48e0c -[NSApplication run] + 464 25 Electron Framework 0x000000010dfa8564
            _ZN4node23GetMultiIsolatePlatformEPNS_11IsolateDataE + 9097964 26 Electron Framework
            0x000000010dfa6c5c _ZN4node23GetMultiIsolatePlatformEPNS_11IsolateDataE + 9091556 27
            Electron Framework 0x000000010df5a834
            _ZN4node23GetMultiIsolatePlatformEPNS_11IsolateDataE + 8779196 28 Electron Framework
            0x000000010df24cc0 _ZN4node23GetMultiIsolatePlatformEPNS_11IsolateDataE + 8559176 29
            Electron Framework 0x000000010d212e84
            _ZN2v88internal20SetupIsolateDelegate13SetupBuiltinsEPNS0_7IsolateEb + 3654592 30
            Electron Framework 0x000000010d214798
            _ZN2v88internal20SetupIsolateDelegate13SetupBuiltinsEPNS0_7IsolateEb + 3661012 31
            Electron Framework 0x000000010d210b10
            _ZN2v88internal20SetupIsolateDelegate13SetupBuiltinsEPNS0_7IsolateEb + 3645516 32
            Electron Framework 0x000000010b51cde8
            _ZN2v88internal8compiler10BasicBlock15set_loop_headerEPS2_ + 13524 33 Electron Framework
            0x000000010b51dcf4 _ZN2v88internal8compiler10BasicBlock15set_loop_headerEPS2_ + 17376 34
            Electron Framework 0x000000010b51db44
            _ZN2v88internal8compiler10BasicBlock15set_loop_headerEPS2_ + 16944 35 Electron Framework
            0x000000010b51c608 _ZN2v88internal8compiler10BasicBlock15set_loop_headerEPS2_ + 11508 36
            Electron Framework 0x000000010b51c834
            _ZN2v88internal8compiler10BasicBlock15set_loop_headerEPS2_ + 12064 37 Electron Framework
            0x000000010b24d1d8 ElectronMain + 128 38 dyld 0x00000001854c7e50 start + 2544
          </div>
        </div>
      </div>
    </div>
  );
}
