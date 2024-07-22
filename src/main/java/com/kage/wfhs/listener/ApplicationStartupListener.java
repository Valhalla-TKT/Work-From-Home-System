package com.kage.wfhs.listener;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.lang.management.ManagementFactory;

@Component
public class ApplicationStartupListener implements ApplicationListener<ApplicationReadyEvent> {

    private final long jvmStartTime;

    public ApplicationStartupListener() {
        this.jvmStartTime = ManagementFactory.getRuntimeMXBean().getStartTime();
    }

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        long endTime = System.currentTimeMillis();
        long startupTimeMillis = endTime - this.jvmStartTime;
        double startupTimeSeconds = startupTimeMillis / 1000.0;

        long processRunningTimeMillis = ManagementFactory.getRuntimeMXBean().getUptime();
        double processRunningTimeSeconds = processRunningTimeMillis / 1000.0;

        System.out.printf("Started WfhsApplication in %.3f seconds (process running for %.3f)%n",
                startupTimeSeconds, processRunningTimeSeconds);
    }
}
