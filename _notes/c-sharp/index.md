---
layout: notes
title: C#
parent: true
active: notes
---

# The relationship between C# and the .NET Framework

[C#][C#] is a multi-paridigm language designed and developed by Microsoft which conforms to the [Common Language Interface][CLI](CLI).

The CLI is a specification that describes the executable code and runtime environment. The CLI defines:

*   [Common Type System][CTS] (CTS) are the data types shared by all CTS-compliant languages
*   Common Language Specification (CLS) are language rules to allow interoperability between CLS-compliant languages
*   [Virtual Execution System][VES] (VES) is the language runtime which will runs [Common Intermediate Language][CIL] (CIL) bytecode

[.NET][.NET] is a proprietary implementation of te CLI by Microsoft, which includes the [Common Language Runtime][CLR] (CLR) (VES implementation), and the [Framework Class Library][FCL] (FCL) (implementation of standard libraries)

When C# code is compiled, it is transformed into platform independent CIL bytecode. This bytecode can then be compiled to native code or executed in a VSE (Such as CIL, or Mono)

[C#]: http://en.wikipedia.org/wiki/C_Sharp_%28programming_language%29
[CLI]: http://en.wikipedia.org/wiki/Common_Language_Infrastructure
[CTS]: http://en.wikipedia.org/wiki/Common_Type_System
[VES]: http://en.wikipedia.org/wiki/Virtual_Execution_System
[CIL]: http://en.wikipedia.org/wiki/Common_Intermediate_Language
[.NET]: http://en.wikipedia.org/wiki/.NET_Framework
[CLR]: http://en.wikipedia.org/wiki/Common_Language_Runtime
[FCL]: http://en.wikipedia.org/wiki/Framework_Class_Library

**Attribution**:

* _C# 5.0 in a Nutshell: Definitive Reference_.  J Albahari, B Albahari
*    Wikipedia (Where noted)
