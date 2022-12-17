import React from 'react'
import { Player, useCreateStream } from '@livepeer/react';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

const Livepeer = () => {

    let { id: contractAddress } = useParams()
    console.log(contractAddress)

    const [streamName, setStreamName] = useState('');
    const {
        mutate: createStream,
        data: stream,
        status,
    } = useCreateStream(streamName ? { name: streamName } : null);
    const isLoading = useMemo(() => status === 'loading', [status]);

    return (
        <div>
            <div>
                <div>
                    <input
                        type="text"
                        placeholder="Stream name"
                        onChange={(e) => setStreamName(e.target.value)}
                    />
                </div>

                {stream?.playbackId && (
                    <Player
                        title={stream?.name}
                        playbackId={stream?.playbackId}
                        autoPlay
                        muted
                    />
                )}

                <div>
                    {!stream && (
                        <button
                            onClick={() => {
                                createStream?.();
                            }}
                            disabled={isLoading || !createStream}
                            variant="primary"
                        >
                            Create Stream
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Livepeer